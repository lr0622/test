function v(){
	var html = `
		<h4><%=title%>:共有<%=total%>条</h4>
		<ul>
			<%for(var i=0;i<subjects.length;i++){%>
				<li title="<%=subjects[i].title%>">
					<a href="<%=subjects[i].alt%>" target="_blank">
						<img src="<%=subjects[i].images.large%>"/>
						<p>
							<%=subjects[i].title.substring(0,8)%>
							<strong>
								<%if(subjects[i].rating.average != 0){%>
									<%=subjects[i].rating.average%>
								<%}%>
							</strong>
						</p>	
					</a>
				</li>
			<%}%>
		</ul>
		
		<div id="page">
			<%for(var i=0;i<len;i++){%>
				<%if(i == (active-1)){%>
					<span class="active"><%=(i+1)%></span>
				<%}else{%>
					<span><%=(i+1)%></span>
				<%}%>
			<%}%>
		</div>
	`;
	return html;
}




