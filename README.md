# Prototype Exercise

The idea is to be able to add devices and configure the controls to each device type (some devices use buttons, volume sliders, brightness sliders, equalizer mode selectors, etc).


## Admin

This app allows you to configure your different devices.

## Mobile

This app allows you to manipulate the state of each device.

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

### Notes

Uses firebase as the persistence repository and this allows the changes to be seen in real time between the apps. In order to use this prototype you should include your own firebase.js file with the proper configurations.
