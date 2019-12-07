import React,  {Component}  from 'react';



import Toolbar from './components/toolbar/Toolbar'
import SideDrawer from './components/sidedrawer/SideDrawer'
import BackDrop from './components/backdrop/Backdrop' 
class NavbarDemo extends Component {
  constructor() {
    super();
    this.state = {
     sideDrawerOpen:false
    };
  }

  drawerToggleClickHandler = () =>{
    this.setState((prevState)=>{
      return {sideDrawerOpen:!prevState.sideDrawerOpen}
    });
  }
  backDropClickhandler = () =>{
      this.setState({sideDrawerOpen:false});
  }

  render() {
    let sidedrawer;
    let backdrop;
    if(this.state.sideDrawerOpen){
       
       backdrop=<BackDrop click={this.backDropClickhandler}/>
    }
    return (
      <div style={{height:'0px'}}>
      
        <Toolbar DrawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen}/>
        {backdrop}
      
      </div>
    );
  }
}
export default NavbarDemo
