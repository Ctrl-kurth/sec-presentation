from PIL import Image
import pillow_heif
import sys

src = r"c:\Users\kurta\SEC-presentation\Public\Kurth AR\PIctures for AR\Specialized Technical Training (ArcServe).HEIC"
dst = r"c:\Users\kurta\SEC-presentation\Public\Kurth AR\PIctures for AR\Specialized Technical Training and arcserve part\Specialized Technical Training (ArcServe).jpg"

heif_file = pillow_heif.read_heif(src)
image = Image.frombytes(heif_file.mode, heif_file.size, heif_file.data, "raw")
image.save(dst, format="JPEG", quality=90)
print('Converted', src, '->', dst)