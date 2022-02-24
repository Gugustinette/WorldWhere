# Automatically downloading and installing the NER package
# Script should be run from root folder

# Delete the ner package in case it exists
# rm stanford-ner-4.2.0.zip
# rm -rf setup/stanford-ner-2020-11-17

# Download Stanford NER
echo "Downloading stanford-ner-4.2.0.zip..."
curl https://downloads.cs.stanford.edu/nlp/software/stanford-ner-4.2.0.zip --output stanford-ner-4.2.0.zip

# Unzip the ner package in the lib folder
unzip stanford-ner-4.2.0.zip -d lib

# Delete the ner package
rm stanford-ner-4.2.0.zip
