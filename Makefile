.PHONY: $(MAKECMDGOALS)

# all: setup server test
# `make setup` will be used after cloning or downloading to fulfill
# dependencies, and setup the the project in an initial state.
# This is where you might download rubygems, node_modules, packages,
# compile code, build container images, initialize a database,
# anything else that needs to happen before your server is started
# for the first time
setup:
	@echo "  >  Installing package dependencies..."
	npm install
	@echo "  >  Installed package dependencies..."

# `make server` will be used after `make setup` in order to start
# an http server process that listens on any unreserved port
#	of your choice (e.g. 8080). 
server:
	@echo "  >  Starting server..."
	npm start
	@echo "  >  Navigate browser to http://localhost:4000 to view application ..."

# `make test` will be used after `make setup` in order to run
# your test suite.
test:
	@echo "  >  Running unit tests with Jest..."
	npm test
