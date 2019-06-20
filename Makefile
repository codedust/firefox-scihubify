build:
	rm -f addon.zip
	zip -r addon.zip * -x Makefile README.md
