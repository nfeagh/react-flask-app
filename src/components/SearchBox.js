import React from 'react';

const SearchBox = (props) => {

	return (

		<div class="input-group col col-sm-4 ml-auto">
			<input 
				class="form-control " 
				value={props.value} 
				type="search" 
				placeholder='Type to search by name...'
				onChange={(event) => props.setSearchValue(event.target.value)} />
			<div class="input-group-append" onClick={() => props.handleSearchClick(props.searchValue)}>
				<div class="input-group-text" id="btnGroupAddon2">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
				</svg>
				</div>
			</div>
		</div>

		// <div className='col col-sm-4 ml-auto'>
		// 	<input
		// 		className='form-control'
		// 		value={props.value}
		// 		onChange={(event) => props.setSearchValue(event.target.value)}
		// 		placeholder='Type to search by name...'
		// 	></input><SearchButton />

			
		// </div>
	);
};

export default SearchBox;

