import sys
sys.path.insert(0, 'ml')

from ml.src.utils.dataset_matcher import find_dataset_match
from ml.src.utils.guardian import guardian_strong_match
from ml.src.utils.non_news import is_non_news
from ml.src.utils.rules import rule_based_check, validate_person_names

text = "Iran-US Tensions News Live Updates: I would prefer a deal, Trump weighs strikes as America evacuates staff, Tehran warns of retaliation"

print("=" * 70)
print("TESTING NEWS AGAINST FAKE NEWS DETECTOR")
print("=" * 70)
print(f"\nText: {text[:80]}...\n")

# Check dataset
print("1. DATASET CHECK")
print("-" * 70)
dataset_result = find_dataset_match(text)
print(f"   Found in dataset: {dataset_result['found']}")
if dataset_result['found']:
    label = dataset_result['label']
    print(f"   Classification (0=Fake, 1=Real): {label}")
    print(f"   Similarity: {dataset_result['similarity']:.2%}")
    print(f"   Source: {dataset_result.get('source', 'N/A')}")
else:
    print("   Not found in training datasets")

# Check if non-news
print("\n2. NON-NEWS CHECK")
print("-" * 70)
is_non = is_non_news(text)
print(f"   Is casual/non-news: {is_non}")

# Check person names
print("\n3. PERSON NAME CHECK")
print("-" * 70)
person_check = validate_person_names(text)
print(f"   Valid names: {person_check['valid']}")
if not person_check['valid']:
    print(f"   Reason: {person_check['reason']}")

# Check rules
print("\n4. RULE-BASED CHECK")
print("-" * 70)
rule_check = rule_based_check(text)
print(f"   Passed rule check: {rule_check}")

# Check Guardian
print("\n5. GUARDIAN NEWS SOURCE CHECK")
print("-" * 70)
guardian_found = guardian_strong_match(text)
print(f"   Found in Guardian: {guardian_found}")

print("\n" + "=" * 70)
print("FINAL PREDICTION")
print("=" * 70)

if dataset_result['found']:
    pred = "Real" if dataset_result['label'] == 1 else "Fake"
    print(f"✓ DATASET MATCH: {pred} (Source: {dataset_result.get('source', 'N/A')})")
elif guardian_found:
    print("✓ GUARDIAN CONFIRMED: Real")
else:
    print("✓ DEFAULT: Real (not found in known databases)")
