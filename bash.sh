#!/usr/bin/env bash

typeofvar () {

    local type_signature=$(declare -p "$1" 2>/dev/null)

    if [[ "$type_signature" =~ "declare --" ]]; then
        printf "string"
    elif [[ "$type_signature" =~ "declare -a" ]]; then
        printf "array"
    elif [[ "$type_signature" =~ "declare -A" ]]; then
        printf "map"
    else
        printf "none"
    fi

}

a="string"

typeofvar a # string

b=(array)

typeofvar b # array

declare -A c=([key]=value)

typeofvar c # map

f () {
    echo "is a function"
}

typeofvar f # none

url="https://worldtimeapi.org/api/timezone/Asia/Bangkok"

time=`curl $url`
typeofvar time

# echo $time
# type($time)
