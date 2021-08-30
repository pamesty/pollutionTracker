sap.ui.define([
        "com/te/pollutionTracker/controller/BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/f/library"
    ],
    function(Controller, JSONModel, fioriLibrary) {
        "use strict";

        return Controller.extend("com.te.pollutionTracker.controller.Master", {
            onInit: function() {
                let countriesModel = new JSONModel('https://02a7a2dc-bd4b-4564-ac9e-4a01fa796d0b.mock.pstmn.io/countries');
                countriesModel.setSizeLimit(1000);
                this.getView().setModel(countriesModel, 'countries');
            },

            onCountryPress: function() {
                //obtiene el Flexible Column Layout
                let getFCLRef = this.getView().getParent().getParent();

                getFCLRef.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
            }
        });
    });