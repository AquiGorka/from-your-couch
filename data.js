export default {
  types: [
    { id: '1', label: 'Samsung Audio', controls: [
      { type: 'button', label: 'Power', id: 1, },
      { type: 'slider', label: 'Volume', id: 2, },
      { type: 'select', label: 'Playlist', id: 3, data: ['Samsung Audio 1', 'Samsung Audio 2'], },
    ]},
    { id: '2', label: 'Sony Audio', controls: [
      { type: 'button', label: 'Power', id: 1, },
      { type: 'slider', label: 'Volume', id: 2, },
      { type: 'select', label: 'Playlist', id: 3, data: ['Sony Audio 1', 'Sony Audio 2'], },
    ]},
    { id: '3', label: 'Apple TV', controls: [
      { type: 'button', label: 'Power', id: 1, },
      { type: 'slider', label: 'Brightness', id: 2, },
      { type: 'slider', label: 'Volume', id: 3, },
    ]},
    { id: '4', label: 'Citrus Lights', controls: [
      { type: 'button', label: 'On/Off', id: 1, },
    ]},
  ],
  devices: [
    { id: '1-bedroom-apple-tv', label: 'Bedroom Apple TV', type: '3', api: { verb: '', url: '' }, state: [ { id:1, value: 0 }, { id:2, value: 0 }, { id:3, value: 0 } ]},
    { id: '2-livingroom-player', label: 'Livingroom Player', type: '1', api: { verb: '', url: '' }, state: [ { id:1, value: 0 }, { id:2, value: 0 }, { id:3, value: 0 } ]},
    { id: '3-livingroom-lights', label: 'Livingroom Lights', type: '4', api: { verb: '', url: '' }, state: [ { id:1, value: 0 } ]},
  ],
}
