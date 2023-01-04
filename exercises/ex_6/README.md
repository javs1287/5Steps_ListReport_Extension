# DEPLOYING YOUR CUSTOM APP TO YOUR BACKEND SYSTEM

## Introduction
In this section you will deploy your custom app to your SAP S/4HANA system and consume the app in your own SAP Fiori Launchpad.

## Deploy your Adaptation Project to your SAP S/4HANA backend system
Right-click on the **manifest.appdescr_variant** file and from the menu navigate to **Adaptation Project >> Open Deployment Wizard**.

  ![Deploy Application](images/deploy1.png)

Select your backend system destination and login with your user ID and password

  ![Deploy Application](images/deploy2.png)

Once you have logged in, click on **Next**

  ![Deploy Application](images/deploy3.png)

Enter the name of the package where you will deploy the extension and click **Next**

**Package: ZFIO_LR_EXT_XX**

  ![Deploy Application](images/deploy4.png)

Enter a transport request to store the deployed objects and click on **Finish**

**Transport request number: <Any available workbench request>**

  ![Deploy Application](images/deploy5.png)

Wait for the deployment of your code. On success you will see notifications describing successful deployment.

  ![Deploy Application](images/deploy6.png)

To confirm successful deployment, run report /UIF/GET_FILES_4_NS in your S/4HANA backend and make sure you only select the Customer base layer.

  ![Deploy Application](images/deploy7.png)

You should find all created objects, including your fragment and controller.

  ![Deploy Application](images/deploy8.png)

Start the Manage Launchpad App from your launchpad. Search for your custom catalog ZFIORI_TC_EXTENSIBLITY, open it and select option to copy content from other catalog.

  ![Deploy Application](images/deploy10.png)

Enter Package and transport request where XX represents your developer ID:

**Package: ZFIO_LR_EXT_XX**
**Transport request number: <Any available workbench request>.**

  ![Deploy Application](images/deploy11.png)

Click the Copy from Other Catalog button and search for SAP_TC_PRC_COMMON. This is the technical catalog for Manage Purchase Orders & can be found in the Fiori [Apps library](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F0842A'))

You may also search for the app by using “Adapt Filters” button and searching for:

**Semantic Object:   PurchaseOrder**
**Semantic Action:   manage**

  ![Deploy Application](images/deploy12.png)

Before you continue you need to obtain the technical ID of your extension. To do so, in your BAS project, open **manifest.appdescr_variant** in the text editor and copy the value of parameter ID where XX represents your developer ID:

**Sample ID: customer.ZPOEXT.NOTIF.XX**

  ![Deploy Application](images/parameter.png)

Edit the three values highlighted in red where XX represents your developer ID and Save:

**Action: zManage  (this field is case sesitive)**
**SAP UI5 Component ID: <obtained in previous step>**
**Target Application Title: Send Notifications**

  ![Deploy Application](images/deploy13.png)

In the Tiles tab, edit fields Title and Subtitle and Save:

**Title:   Review Purchase Orders**
**Subtitle:  Send Notifications**

  ![Deploy Application](images/deploy14.png)

Go back to the Fiori Launchpad space and open FLP Content Manager: Client Specific. Search for your custom catalog: ZFIORI_BC_EXTENSIBILITY and select button to Add Tiles/Target Mappings to selected Catalog

  ![Deploy Application](images/deploy15.png)

Search for custom action zManage, select the Target Mapping and click on button Add Tile/TM Reference. You will be prompted to enter a transport request. Once done, navigate back to the main screen

  ![Deploy Application](images/deploy16.png)

Using transaction PFCG or SU01 assign role ZFIORI_BR_EXTENSIBILITY to your user ID.

  ![Deploy Application](images/deploy18.png)

Run the mass maintenance program PRGN_COMPARE_ROLE_MENU to assist you in adjusting the role services and authorizations. Navigate to the program editor.

For example, you can find transaction SE38 using the App Finder > SAP Menu.
* Enter the program name PRGN_COMPARE_ROLE_MENU and press Execute.
* Start the program in SA38 or SE38 and enter your custom role ZFIORI_BR_EXTENSIBILITY
* Check the Type of Application Group = Launchpad Catalog

  ![Deploy Application](images/deploy19.png)
  ![Deploy Application](images/deploy20.png)

Select all the rows and press Adapt Menu to update the role.

**IMPORTANT: Adapt Menu will update the menu tab listing the applications in the role. This also updates the related authorizations. However, it will NOT yet generate the authorizations profile.  This gives you the chance to review and adjust the authorizations if you need to.**

  ![Deploy Application](images/deploy21.png)

Click on button Mass Generation. Select your role and click on Generate Profile.

  ![Deploy Application](images/deploy22.png)
  ![Deploy Application](images/deploy23.png)

Select option Read old status and merge with new data and Execute.

  ![Deploy Application](images/deploy24.png)

For this exercise we can assign ‘*’ to the authorization object activities.

**For these exercises it is sufficient to use the wildcard * for all values. In your own development environment. you should set appropriate values for each authorization field based on your business requirements.**

  ![Deploy Application](images/deploy25.png)

Save and Generate the authorization profile. Click on Back to get back to the Mass Generation Program
  ![Deploy Application](images/deploy26.png)

Go Back and Refresh the screen. Click on button Role to navigate to the PFCG view of your role.

  ![Deploy Application](images/deploy27.png)
  ![Deploy Application](images/deploy28.png)

Run the User Comparison to adjust user authorization data / profiles. (A Red icon indicates this needs to be done).

  ![Deploy Application](images/deploy29.png)

Logon to your SAP Fiori Launchpad and search for both your custom catalog and your custom tile – which is based on your app variant  

  ![Deploy Application](images/deploy30.png)

Launch your custom variant and try out your customized SAP Fiori application Review Purchase Orders – Send Notifications

  ![Deploy Application](images/deploy31.png)

## Conclusion
You have now concluded an end-to-end development of an SAP Fiori App extension. We hope you enjoyed this exercise!
