BRANCH_STR=`git rev-parse --abbrev-ref HEAD|sed "s/\//_/g"`

build:
	@echo "开始打包"; \
	if test "$(BRANCH_STR)" = "master"; then \
	  npm run build:prod;\
	elif test "$(BRANCH_STR)" = "test"; then \
	  npm run build:test;\
	else \
	  npm run build:dev; \
	fi
