from __future__ import annotations

import json
import sys
from pathlib import Path


SITE_ROOT = Path(__file__).resolve().parents[1]
PDF_WORK = SITE_ROOT.parent / "pdfs"
sys.path.insert(0, str(PDF_WORK))

import build_exam_sets_3_5 as source  # noqa: E402


def visual_payload(value):
    result = {"type": value.__class__.__name__}
    for attr in ("items", "rows"):
        if hasattr(value, attr):
            result[attr] = getattr(value, attr)
    return result


def q_sequence(number, sequence, options, answer, prompt="Hangisi düzeni bozmaktadır?", intro=None, category="Sayısal örüntü - düzeni bozan sayı"):
    return {
        "id": number,
        "kind": "sequence",
        "category": category,
        "intro": intro,
        "sequence": sequence,
        "prompt": prompt,
        "options": options,
        "answer": answer,
    }


def q_logic(number, statements, options, answer, prompt="Buna göre aşağıdakilerden hangisi kesinlikle doğrudur?", intro=None, category="Sözel mantık"):
    return {
        "id": number,
        "kind": "logic",
        "category": category,
        "intro": intro,
        "statements": statements,
        "prompt": prompt,
        "options": options,
        "answer": answer,
    }


def q_action(number, explanation, action_i, action_ii, answer, prompt="Hangisi mantıklı bir eylemdir?"):
    return {
        "id": number,
        "kind": "action",
        "category": "Açıklama + I / II",
        "context": explanation,
        "actions": [action_i, action_ii],
        "prompt": prompt,
        "options": ["Yalnız I", "Yalnız II", "I ve II", "Ne I ne II"],
        "answer": answer,
    }


def q_ordering(number, intro, rules, options, answer, category="Sıralama mantığı"):
    return {
        "id": number,
        "kind": "logic",
        "category": category,
        "intro": intro,
        "statements": rules,
        "prompt": "Buna göre aşağıdakilerden hangisi kesinlikle doğrudur?",
        "options": options,
        "answer": answer,
    }


def q_inference(number, intro, statements, fact, options, answer):
    return {
        "id": number,
        "kind": "inference",
        "category": "Çıkarım",
        "intro": intro,
        "statements": statements,
        "fact": fact,
        "prompt": "Buna göre hangisi kesinlikle doğrudur?",
        "options": options,
        "answer": answer,
    }


def q_visual(number, category, intro, diagram, option_diagram, answer, prompt="Hangisi gelmelidir?"):
    return {
        "id": number,
        "kind": "visual",
        "category": category,
        "intro": intro,
        "prompt": prompt,
        "visual": visual_payload(diagram),
        "visualOptions": visual_payload(option_diagram),
        "options": ["A", "B", "C", "D", "E"],
        "answer": answer,
    }


def q_odd_visual(number, intro, options_diagram, answer, category="Uyumsuz şekil"):
    return {
        "id": number,
        "kind": "visual-odd",
        "category": category,
        "intro": intro,
        "prompt": "Hangisi diğerlerinden farklıdır?",
        "visualOptions": visual_payload(options_diagram),
        "options": ["A", "B", "C", "D", "E"],
        "answer": answer,
    }


def q_number_matrix(number, rows, options, answer, intro="Her satır aynı matematiksel kuralla oluşturulmuştur."):
    return {
        "id": number,
        "kind": "number-matrix",
        "category": "Sayı matrisi",
        "intro": intro,
        "matrix": rows,
        "prompt": "? kaçtır?",
        "options": options,
        "answer": answer,
    }


def main():
    source.q_sequence = q_sequence
    source.q_logic = q_logic
    source.q_action = q_action
    source.q_ordering = q_ordering
    source.q_inference = q_inference
    source.q_visual = q_visual
    source.q_odd_visual = q_odd_visual
    source.q_number_matrix = q_number_matrix

    payload = {
        "3": source.set_3_questions(),
        "4": source.set_4_questions(),
        "5": source.set_5_questions(),
    }
    destination = SITE_ROOT / "app" / "generated-sets.json"
    destination.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(destination)


if __name__ == "__main__":
    main()
