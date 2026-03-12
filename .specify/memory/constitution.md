<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
	- Principle 1 placeholder -> I. Clean and Efficient Code
	- Principle 2 placeholder -> II. Minimal Dependency Surface
	- Principle 3 placeholder -> III. React 19 and Bootstrap Baseline
	- Principle 4 placeholder -> IV. Simple, Responsive, Light UI
	- Principle 5 placeholder -> V. Design-Phase Content First, Testing Deferred
- Added sections:
	- Technical Standards
	- Workflow and Delivery Rules
- Removed sections:
	- None
- Templates requiring updates:
	- .specify/templates/constitution-template.md: ✅ updated
	- .specify/templates/plan-template.md: ✅ updated
	- .specify/templates/spec-template.md: ✅ updated
	- .specify/templates/tasks-template.md: ✅ updated
	- .specify/templates/commands/*.md: ⚠ pending (directory not present in repository)
	- .github/agents/speckit.specify.agent.md: ✅ updated
	- .github/agents/speckit.tasks.agent.md: ✅ updated
	- .github/agents/speckit.implement.agent.md: ✅ updated
- Deferred TODOs:
	- None
-->

# Sprint Constitution

## Core Principles

### I. Clean and Efficient Code
All delivered code MUST be readable, maintainable, and efficient for its intended use.
Implementations MUST avoid unnecessary complexity, dead code, and speculative abstractions.
Contributors MUST prefer clear naming, small cohesive units, and straightforward control flow.
Rationale: clear and efficient code reduces defects, onboarding time, and maintenance cost.

### II. Minimal Dependency Surface
The project MUST keep runtime and build dependencies to the minimum needed for feature delivery.
Any added dependency MUST have a direct, justified benefit that cannot be met with existing tools.
Dependency duplication and overlapping libraries MUST be avoided.
Rationale: fewer dependencies improve reliability, security posture, and bundle performance.

### III. React 19 and Bootstrap Baseline
Frontend implementation MUST target React 19 and Bootstrap as the default UI framework baseline.
Architecture and component choices MUST remain compatible with this stack unless a constitution
amendment explicitly approves a change.
Rationale: a stable, shared stack keeps delivery consistent and reduces integration risk.

### IV. Simple, Responsive, Light UI
User experience MUST be clear, simple, and responsive across common mobile and desktop breakpoints.
All new UI surfaces MUST follow a light visual theme and avoid dark-theme defaults unless explicitly
requested for a specific feature.
Rationale: simple and responsive interfaces reduce user friction and improve accessibility.

### V. Design-Phase Content First, Testing Deferred
During specification and design phases, testing tasks MUST NOT be required gates.
Testing is a post-content activity and MAY be planned only after content and design artifacts are
complete.
If any template or command guidance conflicts with this rule, this principle takes precedence.
Rationale: design throughput is prioritized before formal validation activities.

## Technical Standards

- Language and framework choices for frontend work MUST remain TypeScript + React 19 + Bootstrap
	unless amended.
- UX deliverables MUST include responsive behavior and simple interaction flows as acceptance criteria.
- New libraries MUST be assessed for necessity, maintenance quality, and compatibility before adoption.

## Workflow and Delivery Rules

- Plans and tasks MUST include a constitution alignment check before implementation begins.
- Design deliverables MUST prioritize content completeness and UI clarity over pre-implementation
	test execution.
- Post-content validation SHOULD include focused testing and review before release.
- Pull requests MUST document any dependency additions and justify their necessity.

## Governance

This constitution overrides conflicting workflow guidance in templates and agent command files.
Amendments require: (1) a proposed change with rationale, (2) update of dependent templates and
agent guidance, and (3) approval by project maintainers.

Versioning policy for this constitution follows semantic versioning:
- MAJOR: incompatible governance changes or principle removals/redefinitions.
- MINOR: new principle or materially expanded mandatory guidance.
- PATCH: clarifications and non-semantic wording improvements.

Compliance review expectations:
- Every planning artifact MUST pass a constitution alignment check.
- Every implementation pull request MUST confirm dependency and UX compliance with this document.

**Version**: 1.0.0 | **Ratified**: 2026-03-12 | **Last Amended**: 2026-03-12
