#!/usr/bin/env python3
from PIL import Image, ImageDraw
import os

# 画像パス
vixion_path = "/home/ubuntu/kibidango-lp/vixion01_main.webp"
x68000_path = "/home/ubuntu/kibidango-lp/x68000z_main.webp"
gen_path = "/home/ubuntu/kibidango-lp/gen_product.webp"

# 画像を読み込み
vixion = Image.open(vixion_path).convert("RGBA")
x68000 = Image.open(x68000_path).convert("RGBA")
gen = Image.open(gen_path).convert("RGBA")

# キャンバスサイズ（横長のHero画像）
canvas_width = 1400
canvas_height = 700

# 新しいキャンバスを作成（白からグレーのグラデーション背景）
canvas = Image.new("RGB", (canvas_width, canvas_height), (255, 255, 255))

# グラデーション背景を作成
for y in range(canvas_height):
    color = int(255 - (y / canvas_height) * 20)  # 白から薄いグレーへ
    for x in range(canvas_width):
        canvas.putpixel((x, y), (color, color, color))

# 各画像のサイズと配置を計算
# ViXion01 - 左上に配置（スマートグラス部分を切り抜き）
vixion_crop = vixion.crop((200, 100, 800, 400))  # グラス部分を抽出
vixion_resized = vixion_crop.resize((350, 175), Image.Resampling.LANCZOS)

# X68000 Z - 中央右に配置
x68000_resized = x68000.resize((400, 300), Image.Resampling.LANCZOS)

# g.eN - 右下に配置（使用中の画像から製品部分を切り抜き）
gen_crop = gen.crop((300, 200, 700, 600))  # 製品部分を抽出
gen_resized = gen_crop.resize((280, 280), Image.Resampling.LANCZOS)

# 配置位置
vixion_pos = (750, 80)
x68000_pos = (850, 250)
gen_pos = (1050, 380)

# アクセントラインを描画（赤と黄色）
draw = ImageDraw.Draw(canvas)

# 赤いカーブライン
draw.arc([600, 50, 900, 250], 0, 90, fill=(255, 92, 92), width=8)
draw.arc([700, 200, 1100, 500], 180, 270, fill=(255, 92, 92), width=8)

# 黄色いカーブライン
draw.arc([900, 300, 1200, 600], 270, 360, fill=(255, 204, 51), width=8)

# 画像を配置
canvas.paste(vixion_resized, vixion_pos, vixion_resized if vixion_resized.mode == 'RGBA' else None)
canvas.paste(x68000_resized, x68000_pos, x68000_resized if x68000_resized.mode == 'RGBA' else None)
canvas.paste(gen_resized, gen_pos, gen_resized if gen_resized.mode == 'RGBA' else None)

# 保存
output_path = "/home/ubuntu/kibidango-lp/hero_products_final.png"
canvas.save(output_path, "PNG", quality=95)
print(f"Hero image created: {output_path}")
