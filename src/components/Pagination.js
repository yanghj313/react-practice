import {Component} from 'react';
import '../css/Pagination.css';

class Pagination extends Component{
  constructor(props){
    super(props)
    this.state={
   
    }
  }

  pageClick=(page)=>{
    alert(page+'페이지클릭!')
    
    this.props.setCurrentPage(page)
  }

  prevPage=()=>{
    const {currentPage} = this.props
    if(currentPage-1<1){

      return
    }
    this.props.setCurrentPage(currentPage-1)
  }

  nextPage=()=>{
    const {currentPage} = this.props
    const {total,boardPerPage}=this.props
    const endPage= Math.ceil(total/boardPerPage)
    if(currentPage+1>endPage){
alert('이동불가')
      return
    }
    this.props.setCurrentPage(currentPage+1)

  }



  render(){
    const {total,boardPerPage,currentPage}=this.props
    const endPage= Math.ceil(total/boardPerPage)
    console.log(endPage)//4
    var pageNumbers=[]
    for(var i=1; i<=endPage; i++){
        pageNumbers.push(i)
    }

  
    
    console.log(pageNumbers)
    const result = pageNumbers.map(
        (page)=>(<span className={`page ${currentPage===page? "active" : ""}`} onClick={()=>this.pageClick(page)}>{page}</span>)
    )
    
    return(
      <div id="pagiantion">
        <span class="page" onClick={this.prevPage}>&lt;</span>
        {result}
        <span class="page" onClick={this.nextPage}>&gt;</span>
      </div>
    )
  }
}



export default Pagination;
