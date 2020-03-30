import React from 'react'
const Footer = ({title}) => (<footer>{title}</footer>)

class Foot extends React.Component {
  render() {
    const {footer} = this.props;
    return (
      <div className="foter">
          This website developed by &copy; 74maludin
        <Footer title={footer}/>
      </div>
    )
  }
}
export default Foot