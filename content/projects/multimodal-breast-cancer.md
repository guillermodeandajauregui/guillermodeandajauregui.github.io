---
title: Multimodal AI for Breast Cancer
subtitle: From multimodal research data to robust prognostic models.
eyebrow: PROJECT / CANCER
featured: true
order: 1
status: IN PROGRESS
description: Combining medical images, transcriptomics and clinical information at the patient level.
---

We are developing research pipelines for combining MRI/mammography, RNA-derived signals and clinical information in breast-cancer prognosis.

## Core methodological decisions

- Patient is the unit of splitting and evaluation.
- Compare clinical-only, imaging-only, RNA-only and multimodal predictions.
- Evaluate late fusion first, with stacking trained only on out-of-fold predictions within training folds.
- Use nested cross-validation to control model selection and data leakage.
- Investigate C-index and temporal calibration for survival outcomes.

Data access, ethical review, processing and external validation follow applicable study and institutional requirements.
