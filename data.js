export default {
  types: [
    { id: '001', label: 'Samsung Audio', controls: [
      { type: 'button', label: 'Power', id: '001', },
      { type: 'slider', label: 'Volume', id: '002', },
      { type: 'select', label: 'Playlist', id: '003', data: ['Samsung Audio 1', 'Samsung Audio 2'], },
    ]},
    { id: '002', label: 'Sony Audio', controls: [
      { type: 'button', label: 'Power', id: '001', },
      { type: 'slider', label: 'Volume', id: '002', },
      { type: 'select', label: 'Playlist', id: '003', data: ['Sony Audio 1', 'Sony Audio 2'], },
    ]},
    { id: '003', label: 'Apple TV', controls: [
      { type: 'button', label: 'Power', id: '001', },
      { type: 'slider', label: 'Brightness', id: '002', },
      { type: 'slider', label: 'Volume', id: '003', },
    ]},
    { id: '004', label: 'Citrus Lights', controls: [
      { type: 'button', label: 'On/Off', id: '001', },
    ]},
  ],
  devices: [
    { id: '001', label: 'Bedroom Apple TV', type: '003', api: { verb: '', url: '' }, state: [ { id: '001', value: 0 }, { id: '002', value: 0 }, { id: '003', value: 0 } ]},
    { id: '002', label: 'Livingroom Player', type: '001', api: { verb: '', url: '' }, state: [ { id: '001', value: 0 }, { id: '002', value: 0 }, { id: '003', value: 0 } ]},
    { id: '003', label: 'Livingroom Lights', type: '004', api: { verb: '', url: '' }, state: [ { id: '001', value: 0 } ]},
  ],
}
