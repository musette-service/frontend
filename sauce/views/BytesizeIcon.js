const BytesizeIcon = {
  view: vnode => {
    return m('span', vnode.attrs,
      m('svg', [
        m('use', { 'xlink:href': 'bytesize-symbols.min.svg#i-'+vnode.attrs.class })
      ])
    );
  }
};

export { BytesizeIcon };
