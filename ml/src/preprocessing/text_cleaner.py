"""
text_cleaner.py
Universal text cleaner for Fake News Detection
Supports LR, SVM, NB models
Production-safe & fast (with optional heavy spell check)
"""

import re
import unicodedata
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# ===============================
# NLTK SAFE DOWNLOAD
# ===============================
def _ensure_nltk():
    try:
        stopwords.words("english")
    except LookupError:
        nltk.download("stopwords")
        nltk.download("wordnet")
        nltk.download("omw-1.4")

_ensure_nltk()

# ===============================
# GLOBAL OBJECTS
# ===============================
STOP_WORDS = set(stopwords.words("english"))
STOP_WORDS -= {"no", "not", "never", "against"}

LEMMATIZER = WordNetLemmatizer()

# ===============================
# HEAVY SPELL CHECKER (SYMSPELL) - DISABLED DUE TO BUILD ISSUES
# ===============================
SPELL_CHECK_ENABLED = False

if SPELL_CHECK_ENABLED:
    try:
        from symspellpy import SymSpell, Verbosity
        import pkg_resources

        SYM_SPELL = SymSpell(max_dictionary_edit_distance=2, prefix_length=7)
        DICT_PATH = pkg_resources.resource_filename(
            "symspellpy", "frequency_dictionary_en_82_765.txt"
        )
        SYM_SPELL.load_dictionary(DICT_PATH, 0, 1)
    except ImportError:
        SPELL_CHECK_ENABLED = False

# ===============================
# LIGHT SPELL NORMALIZER
# ===============================
def _normalize_spelling(word: str) -> str:
    word = re.sub(r"(.)\1{2,}", r"\1\1", word)
    return word

# ===============================
# HEAVY SPELL CORRECTION
# ===============================
def _spell_correct(word: str) -> str:
    suggestions = SYM_SPELL.lookup(
        word,
        Verbosity.CLOSEST,
        max_edit_distance=2
    )
    return suggestions[0].term if suggestions else word

# ===============================
# MAIN CLEAN FUNCTION
# ===============================
def clean_text(
    text: str,
    *,
    lemmatize: bool = True,
    remove_stopwords: bool = True,
    spell_check: bool = False   # 🔥 OFF by default
) -> str:
    """
    
    """

    if not isinstance(text, str):
        return ""

    text = unicodedata.normalize("NFKD", text)
    text = text.lower()
    text = re.sub(r"http\S+|www\S+", "", text)
    text = re.sub(r"[^a-z ]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()

    tokens = []

    for word in text.split():
        if remove_stopwords and word in STOP_WORDS:
            continue

        
        word = _normalize_spelling(word)

        
        if spell_check:
            word = _spell_correct(word)

        if lemmatize:
            word = LEMMATIZER.lemmatize(word, pos="v")
            word = LEMMATIZER.lemmatize(word, pos="n")

        tokens.append(word)

    return " ".join(tokens)
