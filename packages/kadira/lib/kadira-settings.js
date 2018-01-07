var kadiraAppIdProperty = {
  fieldName: "Kadira App ID",
  propertyGroup: "kadira",
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
      group: "kadira"
    }
  }
};
Settings.addField(kadiraAppIdProperty);

var kadiraAppSecretProperty = {
  fieldName: "Kadira App Secret",
  propertyGroup: "kadira",
  fieldSchema: {
    type: String,
    optional: true,
    private: true,
    autoform: {
      group: "kadira",
      class: "private-field"
    }
  }
};
Settings.addField(kadiraAppSecretProperty);
