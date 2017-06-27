# From Your Couch Prototype

The idea is to be able to add devices and configure the controls to each device type (some devices use buttons, volume sliders, brightness sliders, equalizer mode selectors, etc).

Devices can be associated to a device type. Each device type is in turn associated to a collection of controls. For the purpose of this prototype the only controls available are: _buton_, _slider_ and _select_. The _select_ control has and additional data array that includes the options to be displayed when using this control.


## Admin

This app allows you to configure your different devices.

This app has 4 sections:

**Home (/)**

This sections displays the current state of the controls associated with the configured devices.

**Devices (/devices)**

This section allows you to add, remove and modify devices and the settings for each one (api verb, api url and the device type). Bear in mind that to create devices there needs to be at least one device type configured.

**Types (/types)**

This sections allows you to add, remove and modify device types. It also allows you to add, remove or modify the controls associated with each device type. Finally it allows to modify the settings for the data list associated wiht controls of the type 'select'.

**Raw (/raw)**

This section allows you to modify the current state of the persistance layer directly modifying the json data. It allows you to reset the data to a pre-configured inital setup of the persistance layer directly modifying the json data. It allows you to reset the data to a pre-configured inital setup.

## Mobile

This app allows you to manipulate the state of each device.

This app has 2 sections:

**Home (/)**

This sections renders a list of all the configured devices.

**Device (/)**

This sections allows you to modify the configured control settings for the device type associated with the device selected.


### Dev
```sh
# cd admin
yarn install
# npm i
nwb serve

# cd mobile
yarn install
# npm i
nwb serve
```

### Build
```sh
# cd admin
npm run build
# cd mobile
npm run build
```

In both cases there should be a new folder (dist) that holds the built assets.


### Notes

Uses firebase as the persistence layer and by doing so allows the changes to be seen in real time between the apps. In order to use this prototype you should include your own firebase.js file with the proper configurations.
