import React from 'react'
import { List, Input, Image, Placeholder, Icon, Button, Modal, Header, Divider, Dropdown, Label, Pagination } from 'semantic-ui-react'
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

            //pagination stuff
            //pagination stuff
            activePage: 1,
            usersPerPage : 8,
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
                isSearching : false
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
        const indexOfLastCard = activePage * usersPerPage;
        const indexOfFirstCard = indexOfLastCard - usersPerPage;
        
        if (this.state.isSearching)
        {
            return (this.state.filteredList.slice(indexOfFirstCard, indexOfLastCard))
        }
        else {
            if(isEmptyObj(this.props.users))
                return {}
            return (this.props.users.slice(indexOfFirstCard, indexOfLastCard))
        }
    }

    countNumberOfPages = (list, usersPerPage) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(list.length / usersPerPage); i++) {
          pageNumbers.push(i);
        }
        return(pageNumbers.length)
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })    

    render()
    {
        const {filteredList, isSearching, clickedUserDetails, userDetailsOpen, usersPerPage, activePage} = this.state
        const {users} = this.props

        const currentCards = this.getListToRender(activePage, usersPerPage)
        let renderCards = null
        
        if (!isEmptyObj(currentCards))
        {
            renderCards = currentCards.map(user => {
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
            });
        }
        
        return(
            <>
                <div className = "product-list-header">
                    <div>
                        <h3>Users</h3>
                    </div>
                    <div>
                    <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
                        <Dropdown.Menu>
                        <Dropdown.Header icon='tags' content='Filter by tag' />
                        <Dropdown.Divider />
                        <Dropdown.Item label={{ color: 'red', empty: true, circular: true }} text='Important' />
                        <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text='Announcement' />
                        <Dropdown.Item label={{ color: 'black', empty: true, circular: true }} text='Discussion' />
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
                                this.countNumberOfPages(filteredList, usersPerPage) > 1 ?     
                                    <div className="pagination-component centered-element">
                                        <Pagination size='tiny' onPageChange={this.handlePaginationChange} totalPages={this.countNumberOfPages(users, usersPerPage)} />
                                    </div>
                                : null
                             :
                                this.countNumberOfPages(users, usersPerPage) > 1 ?     
                                    <div className="pagination-component centered-element">
                                        <Pagination size='tiny' onPageChange={this.handlePaginationChange} totalPages={this.countNumberOfPages(users, usersPerPage)} />
                                    </div>
                                : null
                        }
                    {/* <div className="pagination-component centered-element"> */}
                </div>

                <>
                    {isEmptyObj(clickedUserDetails) ? null :
                        <Modal size='small' centered={false} open={userDetailsOpen}>
                            <Modal.Header>{clickedUserDetails.username + "'"}s details</Modal.Header>
                            <Modal.Content image>
                                <Image wrapped size='medium' src={clickedUserDetails.image} />
                                <Modal.Description>
                                    <Header>{clickedUserDetails.username}</Header>
                                    <p>{clickedUserDetails.email}</p>
                                    {clickedUserDetails.emailConfirmed ? null : <Label basic className="fresheats-brown-bg">This Users account not verified yet.</Label>}                                    
                                </Modal.Description>
                            </Modal.Content>
                            <Divider className="user-details-divider"/>
                            <Modal.Content className="user-details-modal-extra-content">
                                <div className = "product-list-header">
                                    <div>
                                        {/* make admin / revoke access modal */}
                                        <Modal closeIcon trigger={
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
                                        <Modal closeIcon trigger={<Button disabled={!clickedUserDetails.emailConfirmed} size='tiny' negative >Delete User</Button>} basic size='small'>
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
                {/*pre>{JSON.stringify(this.state, " ", 2)}</pre>*/}
            </>
        )
    }
}    

export default UserListSegment;