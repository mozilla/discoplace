LOCALES=(af ar as ast be bg bn_BD bn_IN bs ca cs cy da dbg de el en_US eo es et eu fa ff fi fr fy fy_NL ga ga_IE gd gl gu gu_IN he hi_IN hr ht hu id it ja km kn ko ku lij lt mk ml mn ms my nb_NO ne_NP nl or pa pl pt pt_BR pt_PT ro ru si sk sl sq sr sr_Latn sv sv_SE ta te th tr uk ur vi zh_CN zh_TW)
POT_FILE="locale/templates/LC_MESSAGES/messages.pot"
INIT_FLAGS="--input=$POT_FILE --width=200 --no-translator"
LANGPACK_DIR="src/media/locales"

if [ ! -f $POT_FILE ]; then
    echo "Please run from root discoplace directory."
    exit 2
fi

function confirm {
    PROMPT=$1
    read -p "$PROMPT [Y/n]: " YESNO
    if [[ $YESNO == "n" ]]
    then
        return 1
    else
        return 0
    fi
}

if confirm "Extract new strings?"; then
    commonplace extract_strings
fi

if confirm "Add new locales?"; then
    for LOCALE in ${LOCALES[@]}; do
        if [ ! -d "locale/$LOCALE" ]; then
            LOCALE_DIR="locale/$LOCALE/LC_MESSAGES"
            mkdir -p $LOCALE_DIR
            msginit $INIT_FLAGS --locale=$LOCALE --output-file=$LOCALE_DIR/messages.po
            git add $LOCALE_DIR
        fi
    done
fi
