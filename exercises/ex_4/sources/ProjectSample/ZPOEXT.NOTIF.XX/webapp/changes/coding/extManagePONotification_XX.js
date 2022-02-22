/***
@controller Name:sap.suite.ui.generic.template.ListReport.view.ListReport,
*@viewId:ui.ssuite.s2p.mm.pur.po.manage.st.s1::sap.suite.ui.generic.template.ListReport.view.ListReport::C_PurchaseOrderTP
*/
sap.ui.define([
		'sap/ui/core/mvc/ControllerExtension',
        'sap/suite/ui/generic/template/extensionAPI/extensionAPI'
		// ,'sap/ui/core/mvc/OverrideExecution'
	],
	function (
		ControllerExtension,
        ExtensionAPI
		// ,OverrideExecution
	) {
		"use strict";
		return ControllerExtension.extend("customer.ZPOEXT.NOTIF.XX.extManagePONotification_XX", {
            
            SendNotification: function(oEvent){
                // Get selected item (context) from the table 
                var oContext = this.base.templateBaseExtension.getExtensionAPI().getSelectedContexts();
                
                // Get properties (data) from model
                var oProperties = oContext[0].getModel().getProperty(oContext[0].sPath);
                var sPurchaseOrder = oProperties.PurchaseOrder;
                var sCreatedByUser = oProperties.CreatedByUser; 
                var dAmount = parseFloat(oProperties.PurchaseOrderNetAmount); 

                // Define Custom Notification Provider ID
                var sProviderId = "ZCL_5S2F_PO0001_XX";

                // Define Custom Notification Provider Key - From your notification test program z5s2f_notification_test_xx
                var sNotificationKey = "POCustomNotificationKey";
                
                // Define service name and entity to be called for creating notifications
                var sServiceName = "/sap/opu/odata/IWNGW/CREATE_NOTIFICATION_SRV/";
                var sServiceEntity = "/Notifications";
                var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceName);

                // Run $metadata call - internally fetch x-csrf-token
                oModel.getServiceMetadata();

                // Set body of POST operation call
                var oRequestBody = {
                        "Id": "20ee88ea14434767939fa90155ece18e",
                        "OriginId": "LOCAL",
                        "NotificationTypeId": "20ee88ea-1443-4767-939f-a90155ece18e",
                        "NotificationTypeKey": sNotificationKey,
                        "NotificationTypeVersion": "1",
                        "NavigationTargetAction": "manage",
                        "NavigationTargetObject": "PurchaseOrder",
                        "Priority": "HIGH",
                        "ProviderId": sProviderId,
                        "ActorId": "I834429",
                        "ActorType": "",
                        "ActorDisplayText": "I834429",
                        "ActorImageURL": "https://avatars.services.sap.com/images/jbaltazar.png",
                        "Properties": {
                            "results": [
                                {
                                    "NotificationId":"20ee88ea14434767939fa90155ece18e",
                                    "Key": "po_number",
                                    "Language": "E",
                                    "Value": sPurchaseOrder,
                                    "Type": "Edm.String",
                                    "IsSensitive": false
                                }
                            ]
                        },
                        "Recipients": {
                            "results": [
                                {
                                    "NotificationId":"20ee88ea14434767939fa90155ece18e",
                                    "RecipientId": sCreatedByUser                               
                                },
                                {
                                    "NotificationId":"20ee88ea14434767939fa90155ece18e",
                                    "RecipientId": "I834429"                               
                                }
                            ]
                        },
                        "TargetParameters": {
                            "results": [
                                {
                                    "NotificationId": "20ee88ea14434767939fa90155ece18e",
                                    "Key": "PurchaseOrder",
                                    "Value": sPurchaseOrder
                                }   
                            ]
                        }
                    };

                // Run POST call
                oModel.create(sServiceEntity, oRequestBody, {
                    success : function(oData, oResponse) {
                         // Success
                         sap.m.MessageToast.show("Notification sent to " + sCreatedByUser );
                    },
                    error : function(oError) {
                         // Error
                       sap.m.MessageToast.show("Error when sending notification. Please check your notification provider." );
                    }
                });
                
                // Log to browser console
                console.log(oContext);
                console.log(oModel);
                console.log(oProperties);
                console.log(oProperties.PurchaseOrder, oProperties.CreatedByUser);
                console.log(oRequestBody);
            }           
            
		});
	});