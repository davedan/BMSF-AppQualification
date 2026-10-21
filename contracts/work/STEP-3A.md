# STEP-3A — Multilayer Asset Registry Feature

## Objective

Build the first real multilayer application feature in the BMSF qualification application.

The feature is a small Asset Registry implemented across:

- domain
- service
- React UI
- deterministic tests

This step validates that BMSF can construct a coherent feature across several application layers rather than only implement or repair an isolated function.

## Existing reusable domain capability

The repository already contains:

src/domain/asset-status.ts

The new feature MUST reuse its AssetStatus type and canTransition() transition rules.

Do not duplicate those rules elsewhere.

## Domain Model

Create:

src/domain/asset.ts

It must define:

Asset

with:

- id: string
- name: string
- status: AssetStatus

Also expose a function suitable for constructing a valid Asset.

Requirements:

- id must not be empty
- name must be trimmed
- empty or whitespace-only names are invalid
- new assets start with status "active"

The implementation may use an explicit result or throw an Error for invalid construction, provided behavior is deterministic and tested.

## Service Layer

Create:

src/services/asset-service.ts

Implement an in-memory AssetService.

Required capabilities:

- list(): readonly Asset[]
- create(name: string): Asset
- transition(id: string, to: AssetStatus): Asset

Required behavior:

### create()

- creates a new Asset
- assigns a non-empty deterministic unique ID within the service instance
- trims the supplied name
- starts status as "active"
- stores the asset

No external UUID package may be added.

A simple deterministic sequence such as:

asset-1
asset-2
asset-3

is acceptable and preferred for this qualification step.

### list()

- returns the current assets
- callers must not be able to mutate the service's internal collection through the returned array

### transition()

- finds the Asset by id
- applies the existing canTransition() domain rule
- updates and returns the Asset when allowed
- rejects an unknown id
- rejects a disallowed transition
- must not duplicate the transition matrix from asset-status.ts

## React Feature

Create:

src/features/assets/AssetForm.tsx
src/features/assets/AssetList.tsx
src/features/assets/AssetsPage.tsx

### AssetForm

Must:

- display an Asset name input
- display an Add Asset button
- accept a callback for creating an asset

The component may manage its own input state.

After successful submission the input should be cleared.

Empty input must not be submitted.

### AssetList

Must:

- receive assets as input
- render asset name
- render current status
- render an empty-state message when there are no assets

Where transitions are available, expose controls for allowed next states.

The UI must derive allowed transitions by using the existing canTransition() function.

It must not contain a duplicated transition matrix.

### AssetsPage

Must:

- compose AssetForm and AssetList
- own one AssetService instance for the page lifetime
- reflect newly created assets in the visible list
- reflect successful status transitions in the visible list
- display the heading:

Asset Registry

## Application Integration

Integrate AssetsPage into the application entry point.

The running Vite application must render the Asset Registry React page instead of the current bootstrap placeholder text.

You may change the entry point from:

src/main.ts

to:

src/main.tsx

if appropriate.

Update index.html if required.

Do not introduce a second application entry point.

## Tests

Create:

tests/step3a-asset-service.test.ts
tests/step3a-assets-page.test.tsx

### Service test coverage

At minimum verify:

- first created asset is asset-1
- second created asset is asset-2
- names are trimmed
- new assets start active
- list returns created assets
- returned list cannot mutate internal collection
- allowed transition succeeds
- disallowed transition fails
- unknown asset transition fails

### UI test coverage

Use the existing React and react-dom packages.

Do NOT add jsdom, Testing Library, or any other dependency.

The UI test may use:

react-dom/server

and renderToStaticMarkup().

At minimum verify that the initial AssetsPage output contains:

- Asset Registry
- the asset-name input
- Add Asset
- the empty-state message

Interactive browser behavior is outside Step 3A and will be tested separately later.

## Constraints

- Do not modify contracts/**
- Do not modify BMBOS
- Do not modify bmsf-app.json
- Do not modify opencode.json
- Do not add dependencies
- Do not alter existing Step 2A or Step 2B tests
- Reuse src/domain/asset-status.ts
- Do not duplicate transition rules
- Keep changes focused on this feature
- Do not introduce persistence or Supabase
- Do not create fake platform functionality

## Acceptance Criteria

The step is complete only when:

1. Domain Asset model exists and behaves as specified.
2. AssetService implements create/list/transition behavior.
3. Existing asset-status transition rules are reused.
4. AssetForm, AssetList and AssetsPage exist.
5. AssetsPage is integrated into the Vite application entry point.
6. Service tests pass.
7. UI server-render test passes.
8. Existing Step 2A test still passes.
9. Existing Step 2B test still passes.
10. TypeScript validation passes.
11. Vite production build passes.
12. No dependencies were added.
13. Protected Product Truth was not modified.
