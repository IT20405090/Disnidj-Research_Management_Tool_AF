import React, { Component } from 'react'
import axios from 'axios';
import group from '../../public/group.png';

export default class Home extends Component {
  constructor(props){
    super(props);

    this.state={
      groups:[]
    };
  }

  componentDidMount(){
    this.retriveGroups();
  }

retriveGroups(){
  axios.get("http://localhost:8000/groups").then(res=>{
    if(res.data.success){
      this.setState({
        groups:res.data.existingGroups
      });
      console.log(this.state.groups)
    }
  });
}

onDelete = (id) =>{

  axios.delete(`http://localhost:8000/group/delete/${id}`).then((res) =>{
    alert("Deleted successfully!");
    this.retriveGroups();
  })
}


filterData(groups,searchKey){
  const result = groups.filter((group) =>
  group.GName.toLowerCase().includes(searchKey)||
  group.Leader.toLowerCase().includes(searchKey)
  )

  this.setState({groups:result})
}

handleSearchArea = (e) =>{
  const searchKey = e.currentTarget.value;

  axios.get("http://localhost:8000/groups").then(res=>{
    if(res.data.success){
      this.filterData(res.data.existingGroups,searchKey)
    }
  });
}


  render() {
    return (
      
      <div>
<div>
          

            </div>
  
        <div className='container'>
          <br/>
        
          <div style={{height:'140px', width:'100%', backgroundColor:"#080523", marginTop:'-20px'}}>
                    <br/>
                    <h2 style={{color:'white', textAlign:'center'}}><img src={group} class="mx-auto" alt="" width="150" height="100"/>&nbsp;Registered Groups</h2>
                   <br/>
          </div>

        
        <br/>
            <br/>
          {/* {this.state.travelors.map(travelors=>(
            <div>
                <p>{travelors.Name}</p>
                <p>{travelors.NIC}</p>
                <p>{travelors.Phone}</p>
                <p>{travelors.Email}</p>
                <p>{travelors.type}</p>
                <p>{travelors.date}</p>
              </div>
          ))} */}
          <br/>
          

            <p><b>Step 2 : You can search for your group by the name you gave to the group and see the details you have entered. If you wish to change any information or delete the registered group you can click on the group name and continue.</b></p>
            <div className="col-lg-9 mt-2 mb-2">
              <input
              className="form-control"
              type="search"
              placeholder="search for your group"
              name="searchQuery"
              onChange={this.handleSearchArea}>
              </input>
            </div>
      
      <table className='table'>

          <thead>
          <tr>
          <th scope='col'>No.</th>
          <th scope='col'>Name of the group</th>
          <th scope='col'>Student 1</th>
          <th scope='col'>Student 2</th>
          <th scope='col'>Student 3</th>
          <th scope='col'>Student 4</th>
          <th scope='col'>Group Leader</th>
          <th scope='col'>Delete Group</th>
          

          </tr>

          </thead>
          <tbody>

          {this.state.groups.map((groups,index)=>(
            <tr>
              <th scope='row'>{index+1}</th>
              <td>
              <a href={`/details/${groups._id}`} style={{textDecoration:'none'}}>{groups.GName}</a></td>
              <td>{groups.student1}</td>
              <td>{groups.student2}</td>
              <td>{groups.student3}</td>
              <td>{groups.student4}</td>
              <td>{groups.Leader}</td>
              <td>
              <a className="btn btn-danger btn-block" href='#' onClick={() =>this.onDelete(groups._id)}>
                  &nbsp;Delete Group</a>

              </td>


            </tr>
          ))}

          </tbody>

          

      </table>
      </div>

      
      </div>
    )
  }
}
