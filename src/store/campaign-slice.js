import { createSlice } from '@reduxjs/toolkit';

import { API_URL } from '../constant/apiURL';

const initialState = { campaigns: [] };


const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers:{
        replaceCampaigns(state, action){
            action.payload.forEach(campaign => {
                campaign.status = !campaign.is_paid ? 'Not Paid': 
                    !campaign.is_approved ? 'Pending' : 
                    !campaign.is_active ? 'Paused' : 
                    campaign.quantity !== campaign.distributed_qty ? 'Running': 'Finished';
            });
            state.campaigns = action.payload;
        },
    }
});

export const fetchCampaignData = (token) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const res = await fetch(
                API_URL + 'campaign/pamphlets/list/',
                {
                    headers:{
                        'Authorization': `Token ${token}`
                    },
                }
            );

            if(!res.ok){
                console.log(res);
                throw new Error('Could not fetch data');
            }

            const data = await res.json();

            return data;
        }

        try{
            const campaignsData = await fetchData();
            dispatch(campaignSlice.actions.replaceCampaigns(campaignsData))
        }catch (error){
            console.error(error);
        }
    };
}

export const campaignActions = campaignSlice.actions;

export default campaignSlice.reducer;