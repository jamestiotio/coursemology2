module Extensions::ActionView::Renderer
  def render_within_layout(context, layout)
    context.view_flow.set(:layout, context.capture { yield })
    context.render template: "layouts/#{layout}"
  end
end
