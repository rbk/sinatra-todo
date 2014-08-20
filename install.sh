#!/bin/bash
echo "Installing dependencies";
gem install bson;
gem install bson_ext;
gem install mongo;
echo 'Installing Sinatra! This may take forever!'
gem install sinatra;
gem install thin;
gem install shotgun;
echo 'Finished with no errors.'