"""Atualiza a lista de vozes gravadas em js/vozes.js.
Rode dentro da pasta do site depois de colocar novos .mp3 em audio/<personagem>/:
    python3 ferramentas/atualizar_vozes.py
"""
import re
from pathlib import Path

site = Path(__file__).resolve().parent.parent
js = site / 'js' / 'vozes.js'
texto = js.read_text(encoding='utf-8')
chaves = sorted(f"{p.parent.name}/{p.stem}" for p in (site / 'audio').glob('*/*.mp3'))
lista = ', '.join(f"'{c}'" for c in chaves)
texto = re.sub(r"new Set\(\[[^\]]*\]\)", lambda m: f"new Set([/*ARQUIVOS*/ {lista}])", texto, count=1)
js.write_text(texto, encoding='utf-8')
print(f'{len(chaves)} vozes na lista')
