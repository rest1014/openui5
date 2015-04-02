sap.ui.require([
		"sap/ui/test/Opa5",
		"sap/ui/demo/mdtemplate/test/integration/pages/Common"
	],
	function(Opa5, Common) {
		"use strict";

		var sViewName = "App",
			sAppControl = "idAppControl";

		Opa5.createPageObjects({
			onTheAppPage: {
				baseClass: Common,
				actions: {
					iWaitUntilTheBusyIndicatorIsGone: function () {
						return this.waitFor({
							id : sAppControl,
							viewName : sViewName,
							// inline-matcher directly as function
							matchers : function(oRootView) {
								// we set the view busy, so we need to query the parent of the app
								return oRootView.getParent().getBusy() === false;
							},
							success : function () {
								QUnit.ok(true, "The app is not busy busy anymore");
							},
							errorMessage : "The app is still busy."
						});
					}
				},
				assertions: {
					iShouldSeeTheBusyIndicator: function () {
						return this.waitFor({
							id : sAppControl,
							viewName : sViewName,
							success : function (oRootView) {
								// we set the view busy, so we need to query the parent of the app
								QUnit.ok(oRootView.getParent().getBusy(), "The app is busy");
							},
							errorMessage : "The app is not busy."
						});
					}
				}
			}
		});
	});
