# STEP-2B — Worker Repair Path

## Objective

Repair the existing implementation in:

src/domain/risk-level.ts

so that the existing test passes.

## Existing test

tests/step2b-risk-level.test.ts

The existing test is the source of truth for required behavior and MUST NOT be weakened or deleted.

## Required behavior

Risk levels:

- low
- medium
- high

Allowed escalation:

- low -> medium
- low -> high
- medium -> high

Disallowed:

- medium -> low
- high -> medium
- high -> low
- low -> low
- medium -> medium
- high -> high

## Constraints

- Do not modify contracts/**
- Do not modify BMBOS
- Do not modify bootstrap configuration
- Do not add dependencies
- Preserve the existing test unchanged
- Modify only what is necessary to repair the implementation

## Acceptance Criteria

- tests/step2b-risk-level.test.ts passes unchanged
- TypeScript validation passes
- implementation matches all required escalation rules
