#!/usr/bin/env ruby

require 'json'

tempHash = {
    "helloReminder1" => "hahhcjhabciewbvoewuvbws",
    "helloReminder2" => "khdev khdrv kfhv kse vkes"
}
File.open("temp.json","w") do |f|
    f.write(tempHash.to_json)
end