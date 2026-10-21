# STEP-2A — Basic Worker Happy Path

## Objective

Implement a small TypeScript domain module and its tests.

## Writable target repository

D:\Code\BMSF-AppQualification

## Requirements

Create:

src/domain/asset-status.ts

Define:

export type AssetStatus =
  | "active"
  | "inactive"
  | "retired";

Export:

canTransition(from: AssetStatus, to: AssetStatus): boolean

Allowed transitions:

- active -> inactive
- active -> retired
- inactive -> active
- inactive -> retired

Not allowed:

- active -> active
- inactive -> inactive
- retired -> active
- retired -> inactive
- retired -> retired

Create tests in:

tests/step2a-asset-status.test.ts

The tests must verify every allowed and disallowed transition.

## Constraints

- Do not modify contracts/**
- Do not modify BMBOS
- Do not modify bootstrap configuration
- Do not change package dependencies
- Do not modify unrelated files
- Keep the implementation minimal

## Acceptance Criteria

- src/domain/asset-status.ts exists
- tests/step2a-asset-status.test.ts exists
- all transition rules are implemented correctly
- the dedicated Vitest test passes
- TypeScript validation passes
