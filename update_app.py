#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys

app_path = r"c:\Users\SHASWAT JAISWAL\OneDrive\Desktop\fake_news_detector\ml\src\api\app.py"

# Read the file
with open(app_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with "# 5️⃣ ML ensemble prediction" and replace from there
new_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    
    # Find the line where we need to start replacing
    if "# 5" in line and "ML ensemble prediction" in line:
        # Replace everything from here to the end of the check_news function
        # Add the new logic
        new_lines.append("    # Guardian verification (check against real news sources)\n")
        new_lines.append("    if guardian_real:\n")
        new_lines.append("        return jsonify({\n")
        new_lines.append('            "prediction": "Real",\n')
        new_lines.append('            "confidence": 95,\n')
        new_lines.append('            "reason": "Confirmed by Guardian news sources (verified source)",\n')
        new_lines.append('            "source": "guardian"\n')
        new_lines.append("        })\n")
        new_lines.append("\n")
        new_lines.append("    # DEFAULT: If NOT found in dataset or Guardian -> Show as REAL\n")
        new_lines.append("    return jsonify({\n")
        new_lines.append('        "prediction": "Real",\n')
        new_lines.append('        "confidence": 80,\n')
        new_lines.append('        "reason": "Not found in known fake news databases (assumed real)",\n')
        new_lines.append('        "source": "default"\n')
        new_lines.append("    })\n")
        
        # Skip all lines until we find the next function or section (look for @app.route or # ===)
        i += 1
        while i < len(lines):
            if lines[i].strip().startswith(("@app.route", "# ===", "if __name__")):
                break
            i += 1
        i -= 1  # Back up one since we'll increment at the end of loop
    
    elif not ("# 5" in line and "ML ensemble prediction" in line):
        # Keep lines that are not part of the section we're replacing
        if not any(skip in line for skip in ["ml = ensemble_predict", "HIGHEST PRIORITY", "Guardian doesn't confirm", "Guardian doesn't confirm", "ML says Real", "ml_result", "guardian_result"]):
            new_lines.append(line)
    
    i += 1

# Write back
with open(app_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Updated app.py successfully!")
