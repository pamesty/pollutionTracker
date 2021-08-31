sap.ui.define([
    "com/te/pollutionTracker/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    'sap/f/library'
], function(Controller, JSONModel, fioriLibrary) {
    "use strict";

    return Controller.extend("com.te.pollutionTracker.controller.Detail", {
        onInit: function() {
            var oOwnerComponent = this.getOwnerComponent();

            this.oRouter = oOwnerComponent.getRouter();
            this.oModel = oOwnerComponent.getModel();

            this.oRouter.getRoute("master").attachPatternMatched(this._onSelectingCountry, this);
            this.oRouter.getRoute("detail").attachPatternMatched(this._onSelectingCountry, this);
        },

        _onSelectingCountry: function(oEvent) {
            this._country = oEvent.getParameter("arguments").country || this._country || "0";

        },
        onStatePress: function(oEvent) {
            this.loadData();
            this.oRouter.navTo("city", { layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, state: state, country: this._country });
        },
        onEditToggleButtonPress: function() {
            var oObjectPage = this.getView().byId("ObjectPageLayout"),
                bCurrentShowFooterState = oObjectPage.getShowFooter();

            oObjectPage.setShowFooter(!bCurrentShowFooterState);
        },

        onExit: function() {
            this.oRouter.getRoute("master").detachPatternMatched(this._onSelectingCountry, this);
            this.oRouter.getRoute("detail").detachPatternMatched(this._onSelectingCountry, this);
        },

        loadData: async function() {
            var state = oEvent.getSource().getBindingContext("states").getObject().state;
            var stateModel = await new JSONModel('https://02a7a2dc-bd4b-4564-ac9e-4a01fa796d0b.mock.pstmn.io/state?country=' + this._country);
            stateModel.setSizeLimit(1000);
            this.getView().setModel(stateModel, 'states');
        }
    });
});