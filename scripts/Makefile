FILES = default.css favicon.ico index.html musette-glyphs.ttf musette-glyphs.css
JS = js/*
IMG = img/*

ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif

SHAREDIR = /share/musette/client

all:
	npm i && npm run build

.PHONY: install
install: 
	mkdir -p $(DESTDIR)$(PREFIX)$(SHAREDIR)
	install $(FILES) $(DESTDIR)$(PREFIX)$(SHAREDIR)
	mkdir -p $(DESTDIR)$(PREFIX)$(SHAREDIR)/js
	install $(JS) $(DESTDIR)$(PREFIX)$(SHAREDIR)/js
	mkdir -p $(DESTDIR)$(PREFIX)$(SHAREDIR)/img
	install $(IMG) $(DESTDIR)$(PREFIX)$(SHAREDIR)/img

uninstall:
	rm -r $(DESTDIR)$(PREFIX)$(SHAREDIR)
