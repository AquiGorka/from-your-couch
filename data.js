export default {
  types: [
    { id: '1', label: 'Samsung Audio', ip: '', controls: [
      { id: 'button', label: 'Power' },
      { id: 'slider', label: 'Volume' },
      { id: 'select', label: 'Playlist', data: ['Samsung Audio 1', 'Samsung Audio 2'] },
    ]},
    { id: '2', label: 'Sony Audio', ip: '', controls: [
      { id: 'button', label: 'Power' },
      { id: 'slider', label: 'Volume' },
      { id: 'select', label: 'Playlist', data: ['Sony Aduio 1', 'Sony Audio 2'] },
    ]},
    { id: '3', label: 'Apple TV', ip: '', controls: [
      { id: 'button', label: 'Power' },
      { id: 'slider', label: 'Brightness' },
      { id: 'slider', label: 'Volume' },
    ]},
    { id: '4', label: 'Citrus Lights', ip: '', controls: [
      { id: 'button', label: 'On/Off' },
    ]},
  ],
  devices: [
    { id: '1-bedroom-apple-tv', label: 'Bedroom Apple TV', type: '3', api: { verb: '', url: '' }, state: [ 0,0,0 ]},
    { id: '2-livingroom-player', label: 'Livingroom Player', type: '1', api: { verb: '', url: '' }, state: [ 0,0,0 ]},
    { id: '3-livingroom-lights', label: 'Livingroom Lights', type: '4', api: { verb: '', url: '' }, state: [ 0 ]},
  ],
}
