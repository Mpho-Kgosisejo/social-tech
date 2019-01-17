import React from 'react'
import { List, Input, Image, Placeholder, Icon, Button, Modal, Header, Divider,Checkbox, Dropdown, Label, Pagination } from 'semantic-ui-react'
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import api from '../../../../../../../src/providers/APIRequest';

class UserListSegment extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            userList : this.props.users,
            filteredList : {},
            isSearching : false,
            userDetailsOpen : false,
            clickedUserDetails : {},
            //filterOptions

            admin : false,
            nonAdmin : false,
            showAll : true,

            //filter options
            showOnlyAdmins : false,
            showOnlyNonAdmins : false,
            showAllUsers : true,
            filter : 'All Users',

            //pagination stuff
            activePage: 1,
            usersPerPage : 8,
            currentCards : 0
        }
    }

    filterList = (event) => {
        let currentList = [];
        let newList = [];

        // If the search bar isn't empty
        if (event.target.value !== "") {
            currentList = this.props.users

            newList = currentList.filter(item => {
                const lc = item.username.toLowerCase()
                const filter = event.target.value.toLowerCase()

                return lc.includes(filter)
            })

            this.setState({
                filteredList : newList,
                isSearching : true
            });
        }
        else {
            this.setState({
                isSearching : false,
                filteredList  : []
            })
        }
    }

    validateProfileCompletion = (user) => {        
        if (user.address == "")
            return false
        if (user.firstname == "")
            return false
        if (user.lastname == "")
            return false
        if (user.image == "")
            return false
        if (user.phone == "") 
            return false
        return true
    }

    handleUserClick = (user) => {
        if (this.state.adminModalOpen)
            this.setState({userDetailsOpen : false, clickedUserDetails : {}})
        else
            this.setState({userDetailsOpen : true, clickedUserDetails : user})
    }

    handleUserDeletion = async () => {
        const res = await api.dashboard_Index.delete_user(this.state.clickedUserDetails)
        console.log(res)
        this.setState({ userDetailsOpen : false })
        this.props.refreshState({
            userList : res.data.users
        })
    }

    handleAdminRights = async () => {
        const res = await api.dashboard_Index.make_or_revoke_admin(this.state.clickedUserDetails)
        console.log(res) 
        this.setState({ userDetailsOpen : false })        
        this.props.refreshState({
            userList : res.data.users
        })   
    }

    getListToRender = (activePage, usersPerPage) => {
        //configure Pagination things
        const indexOfLastCard = activePage * usersPerPage
        const indexOfFirstCard = indexOfLastCard - usersPerPage
        
        if (this.state.isSearching)
            return (this.getFilterList(this.state.filteredList).slice(indexOfFirstCard, indexOfLastCard))
        else {
            if(isEmptyObj(this.props.users))
                return {}
            
            return (this.getFilterList(this.props.users).slice(indexOfFirstCard, indexOfLastCard))
        }
    }

    getFilterList = (list) => {
        const { showAllUsers, showOnlyAdmins, showOnlyNonAdmins } = this.state
        let filterOptionsList = []

        list.forEach( user => {
            if(user.admin && showOnlyAdmins)
                filterOptionsList.push(user)
            else if (!user.admin && showOnlyNonAdmins)
                filterOptionsList.push(user)
            else if (showAllUsers) 
                filterOptionsList.push(user)
        })

        return(filterOptionsList)
    }

    countNumberOfPages = (listLength, usersPerPage) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(listLength / usersPerPage); i++) {
          pageNumbers.push(i);
        }
        return(pageNumbers.length)
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })    

    handleUserFilterChange = (admin, nonAdmin, all, filter) => this.setState({showOnlyAdmins : admin, showOnlyNonAdmins : nonAdmin, showAllUsers : all, filter : filter})

    render()
    {
        const {filteredList, isSearching, clickedUserDetails, userDetailsOpen, usersPerPage, activePage, admin, nonAdmin, showAll} = this.state
        const {users} = this.props

        const currentCards = this.getListToRender(activePage, usersPerPage)
        let renderCards = null
        
        if (!isEmptyObj(currentCards))
        {
            renderCards = currentCards.map(user => {
                if (user.admin && admin)
                {
                    console.log("we showing only admins")
                    
                    return (
                        <List.Item id={user.username} onClick={() => this.handleUserClick(user)}>
                            {
                                (user.image === "") ? 
                                    <div>
                                        <div className="user-list-image-div fresheats-brown-bg user-list-item"> 
                                            <h4>{user.username[0].toUpperCase()}</h4> 
                                        </div>
                                        <List.Content className="user-list-item">
                                            <List.Header>{user.username}</List.Header>
                                            {user.email}
                                        </List.Content>
                                        <List.Content verticalAlign='middle' floated='right'>
                                            {user.emailConfirmed ? null : <Label size='tiny' basic className="fresheats-brown-bg">Account not verified</Label>}                                    
                                        </List.Content>
                                    </div>
                                : 
                                    <>
                                        <List.Content  floated='right'>
                                            {user.emailConfirmed ? null : <Label size='tiny' basic className="fresheats-brown-bg">Account not verified</Label>}                                    
                                        </List.Content>
                                        <Image avatar src={user.image}/>
                                        <List.Content>
                                            <List.Header>{user.username}</List.Header>
                                            {user.email}
                                        </List.Content>
                                        
                                    </>
                            }
                        </List.Item>
                    )                }
                else if (!user.admin && nonAdmin)
                {
                    console.log("we showing only non admins")
                    return (
                        <List.Item id={user.username} onClick={() => this.handleUserClick(user)}>
                            {
                                (user.image === "") ? 
                                    <div>
                                        <div className="user-list-image-div fresheats-brown-bg user-list-item"> 
                                            <h4>{user.username[0].toUpperCase()}</h4> 
                                        </div>
                                        <List.Content className="user-list-item">
                                            <List.Header>{user.username}</List.Header>
                                            {user.email}
                                        </List.Content>
                                        <List.Content verticalAlign='middle' floated='right'>
                                            {user.emailConfirmed ? null : <Label size='tiny' basic className="fresheats-brown-bg">Account not verified</Label>}                                    
                                        </List.Content>
                                    </div>
                                : 
                                    <>
                                        <List.Content  floated='right'>
                                            {user.emailConfirmed ? null : <Label size='tiny' basic className="fresheats-brown-bg">Account not verified</Label>}                                    
                                        </List.Content>
                                        <Image avatar src={user.image}/>
                                        <List.Content>
                                            <List.Header>{user.username}</List.Header>
                                            {user.email}
                                        </List.Content>
                                        
                                    </>
                            }
                        </List.Item>
                    )
                }
                else if (showAll)
                {
                    console.log("we showing everyone")                    
                    return (
                        <List.Item id={user.username} onClick={() => this.handleUserClick(user)}>
                            {
                                (user.image === "") ? 
                                    <div>
                                        <div className="user-list-image-div fresheats-brown-bg user-list-item"> 
                                            <h4>{user.username[0].toUpperCase()}</h4> 
                                        </div>
                                        <List.Content className="user-list-item">
                                            <List.Header>{user.username}</List.Header>
                                            {user.email}
                                        </List.Content>
                                        <List.Content verticalAlign='middle' floated='right'>
                                            {user.emailConfirmed ? null : <Label size='tiny' basic className="fresheats-brown-bg">Account not verified</Label>}                                    
                                        </List.Content>
                                    </div>
                                : 
                                    <>
                                        <List.Content  floated='right'>
                                            {user.emailConfirmed ? null : <Label size='tiny' basic className="fresheats-brown-bg">Account not verified</Label>}                                    
                                        </List.Content>
                                        <Image avatar src={user.image}/>
                                        <List.Content>
                                            <List.Header>{user.username}</List.Header>
                                            {user.email}
                                        </List.Content>
                                        
                                    </>
                            }
                        </List.Item>
                    )
                }
            });
        }
        
        return(
            <>
                <div className="product-list-header">
                    <div className="user-list-header">
                        <h3>{ isSearching ? `${filter} | ${ isEmptyObj(filteredList)? null : this.getFilterList(filteredList).length}` : `${filter} | ${ isEmptyObj(users) ? null : this.getFilterList(users).length}` }</h3>
                    </div>
                    <div>
                    <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
                        <Dropdown.Menu>
                            <Dropdown.Header icon='user' content='Filter by :' />
                            <Dropdown.Divider />
                            <Dropdown.Item><h4>Admins</h4></Dropdown.Item>
                            <Dropdown.Item><h4>Users</h4></Dropdown.Item>
                            <Dropdown.Item><h4>Show all</h4></Dropdown.Item>
                            {/* <Dropdown.Item label={{ color: 'pink', empty: true, circular: true }} text='Admins' />
                            <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text='Users' />
                            <Dropdown.Item label={{ color: 'black', empty: true, circular: true }} text='Show all' /> */}
                        </Dropdown.Menu>
                    </Dropdown>
                        <Input placeholder='Search by username' icon='search' type="text" onChange={() => this.filterList(event)}/>
                    </div>
                </div>
                <div className="list-div">
                    <List divided size='large' animated>
                        {
                            isEmptyObj (users) ? 
                                <List.Item>
                                    <Placeholder>
                                        <Placeholder.Header image/>
                                            <Placeholder.Line length='medium' />
                                            <Placeholder.Line length='short' />
                                    </Placeholder>
                                </List.Item>
                                :
                                <> {renderCards} </>
                        }
                    </List>
                        { 
                            isSearching ? 
                                isEmptyObj(filteredList) ?  null : 
                                (this.countNumberOfPages(this.getFilterList(filteredList).length, usersPerPage) > 1 && filteredList.length > usersPerPage)?     
                                    <div className="pagination-component centered-element">
                                        <Pagination size='tiny' activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={this.countNumberOfPages(this.getFilterList(filteredList).length, usersPerPage)} />
                                    </div>
                                : null
                             :
                                isEmptyObj(users) ? null :
                                (this.countNumberOfPages(this.getFilterList(users).length, usersPerPage) > 1  && users.length > usersPerPage)?     
                                    <div className="pagination-component centered-element">
                                        <Pagination  size='tiny' activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={this.countNumberOfPages(this.getFilterList(users).length, usersPerPage)} />
                                    </div>
                                : null
                        }
                </div>

                <>
                    {isEmptyObj(clickedUserDetails) ? null :
                        <Modal size='small' centered open={userDetailsOpen}>
                            <Modal.Header>{clickedUserDetails.username + "'"}s details</Modal.Header>
                            <Modal.Content image>
                                <Image wrapped size='medium' src={clickedUserDetails.image} />
                                <Modal.Description>
                                    <Header>{clickedUserDetails.username}</Header>
                                    <p>{clickedUserDetails.email}</p>
                                    <p>First Name : {clickedUserDetails.firstname}</p>
                                    <p>Last Name : {clickedUserDetails.lastname}</p>
                                    {clickedUserDetails.emailConfirmed ? null : <Label basic className="fresheats-brown-bg">This Users account not verified yet.</Label>}                                    
                                </Modal.Description>
                            </Modal.Content>
                            <Divider className="user-details-divider"/>
                            <Modal.Content className="user-details-modal-extra-content">
                                <div className = "product-list-header">
                                    <div>
                                        {/* make admin / revoke access modal */}
                                        <Modal  closeIcon centered trigger={
                                            <Button size='tiny' disabled={!clickedUserDetails.emailConfirmed} positive>{clickedUserDetails.admin ? 'Revoke admin rights' : 'Make admin'}</Button>
                                        } basic 
                                        size='small'>
                                            <Header content={clickedUserDetails.admin ? 'Revoke ' + clickedUserDetails.username + '`s administrative rights?' : 'Make ' + clickedUserDetails.username + ' an admin?'}/>
                                            <Modal.Content>
                                                <p>
                                                    {clickedUserDetails.admin ? 'This user will not be able to log into the admin dashboard anymore. CLick X or anywhere to cancel the operation and Yes to continue.' : 'Making this user an admin will give them control to delete, add or modify anything on the site. CLick X or anywhere to cancel the operation and Yes to continue.' }
                                                </p>
                                            </Modal.Content>
                                            <Modal.Actions>
                                            <Button onClick={() => this.handleAdminRights()} color='green' inverted>
                                                <Icon name='checkmark' /> Yes
                                            </Button>
                                            </Modal.Actions>
                                        </Modal> 
                                        
                                        {/* delete user modal */}
                                        <Modal closeIcon centered trigger={<Button disabled={!clickedUserDetails.emailConfirmed} size='tiny' negative >Delete User</Button>} basic size='small'>
                                            <Header content='Warning! This Action is irriversible'/>
                                            <Modal.Content>
                                                <p>
                                                    Are you sure you want to delete this User? CLick X or anywhere to cancel the operation and Yes to continue.
                                                </p>
                                            </Modal.Content>
                                            <Modal.Actions>
                                            <Button onClick={() => this.handleUserDeletion()} color='green' inverted>
                                                <Icon name='checkmark' /> Yes
                                            </Button>
                                            </Modal.Actions>
                                        </Modal> 
                                    </div>
                                    <div>
                                        <Button size='tiny' onClick={() => this.handleUserClick()}>Close</Button>                                    
                                    </div>
                                </div>
                            </Modal.Content>
                        </Modal>
                    } 
                </>
                {/*<pre>{JSON.stringify(this.state, " ", 2)}</pre>*/}
            </>
        )
    }
}    

export default UserListSegment;