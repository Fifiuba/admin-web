const datagridStyle = {
  'borderColor': '#1e85c1',
  'height': '500px',
  'backgroundColor': '#e1e2e3',
  '& .MuiDataGrid-columnHeaders':
            {color: '#000',
              backgroundColor: '#1e85c1',
              opacity: '0.8'},
  '& .MuiDataGrid-row':
            {color: '#000',
              backgroundColor: '#fff',
              fontWeight: 425,
            },
  '& .MuiDataGrid-columnHeaderTitle':
            {fontWeight: 950},
  '& .MuiDataGrid-cell':
            {borderColor: '#1e85c1'},
  '& .MuiDataGrid-columnHeaderTitleContainer':
            {borderColor: '#fff'},
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#e1e2e3',
    // color: "red"
  },
  '& .MuiDataGrid-row:focus': {
    backgroundColor: '#e1e2e3',
    // color: "red"
  },
  '& .MuiDataGrid-row:selected': {
    backgroundColor: '#e1e2e3',
    // color: "red"
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '& .MuiBox-root': {
    border: 'none',
    outline: 'none',
  },
};

export default datagridStyle;
