TF_DIR ?= terraform
TF_PLAN ?= tfplan

.PHONY: help
help:
	@printf '%s\n' 'Terraform targets:'
	@printf '  %-18s %s\n' 'make init' 'Initialize Terraform'
	@printf '  %-18s %s\n' 'make upgrade' 'Initialize and upgrade providers/modules'
	@printf '  %-18s %s\n' 'make fmt' 'Format Terraform files'
	@printf '  %-18s %s\n' 'make fmt-check' 'Check Terraform formatting'
	@printf '  %-18s %s\n' 'make validate' 'Validate Terraform configuration'
	@printf '  %-18s %s\n' 'make plan' 'Create terraform/tfplan'
	@printf '  %-18s %s\n' 'make apply' 'Apply terraform/tfplan'
	@printf '  %-18s %s\n' 'make apply-auto' 'Apply current configuration with auto-approve'
	@printf '  %-18s %s\n' 'make output' 'Show Terraform outputs'
	@printf '  %-18s %s\n' 'make destroy-plan' 'Create a destroy plan'
	@printf '  %-18s %s\n' 'make destroy' 'Destroy managed infrastructure'
	@printf '  %-18s %s\n' 'make clean-plan' 'Remove saved plan file'

.PHONY: init
init:
	terraform -chdir=$(TF_DIR) init -upgrade

.PHONY: fmt
fmt:
	terraform -chdir=$(TF_DIR) fmt -recursive

.PHONY: fmt-check
fmt-check:
	terraform -chdir=$(TF_DIR) fmt -check -recursive

.PHONY: validate
validate: fmt-check init
	terraform -chdir=$(TF_DIR) validate

.PHONY: plan
plan: validate
	terraform -chdir=$(TF_DIR) plan -out=$(TF_PLAN)

.PHONY: apply
apply:
	terraform -chdir=$(TF_DIR) apply $(TF_PLAN)

.PHONY: apply-auto
apply-auto: validate
	terraform -chdir=$(TF_DIR) apply -auto-approve

.PHONY: output
output:
	terraform -chdir=$(TF_DIR) output

.PHONY: destroy-plan
destroy-plan: validate
	terraform -chdir=$(TF_DIR) plan -destroy -out=$(TF_PLAN)

.PHONY: destroy
destroy: validate
	terraform -chdir=$(TF_DIR) destroy

.PHONY: clean-plan
clean-plan:
	$(RM) $(TF_DIR)/$(TF_PLAN)
