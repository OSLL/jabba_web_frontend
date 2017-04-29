from flask import render_template, flash, redirect, session, url_for, request, jsonify
from app import app, logic

@app.route('/')
@app.route('/analysis')
def analysis():
    return render_template('analysis.html', active="analysis")

@app.route('/graphs')
def graphs():
    return render_template('graphs.html', active='graphs')



@app.route('/api/graphs')
def api_graphs():
    repository = request.args.get('repository', '', type=str)
    yaml_root = request.args.get('yaml_root', '', type=str)
    graph_type = request.args.get('graph', '', type=str)
    files = request.args.get('files', '', type=str)
    rank_dir = request.args.get('rank_dir', 'left-right', type=str)
    legend = request.args.get('legend', '', type=str)
    call_parameters = request.args.get('call_parameters', '', type=str)
    call_display = request.args.get('call_display', 'none', type=str)

    graph = logic.build_graph(
            repository=repository, 
            yaml_root=yaml_root, 
            graph_type = graph_type, 
            files=files, 
            rank_dir=rank_dir, 
            legend=legend,
            call_parameters=call_parameters,
            call_display=call_display
            )

    return jsonify(graph=graph)
