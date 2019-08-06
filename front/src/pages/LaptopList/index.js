import React, {Component} from 'react';
import { getLaptops } from "../../services/API/laptop";

import Pagination from "material-ui-flat-pagination/lib/index";

import './laptopList.scss';

import Laptop from '../../components/Laptop'
import CircularProgress from "@material-ui/core/CircularProgress";
import {showTextErrorToast} from "../../utils/utils";

class LaptopList extends Component{

    state = {
        isLoading: true,
        laptops: [],
        laptopsCount: 0,
        limit: 4,
        page: 0,
        offset: 0
    };

    constructor(props) {
        super(props);
        //this.updateEmail = this.updateEmail.bind(this);
        this.getLaptopsPageLimit = this.getLaptopsPageLimit.bind(this);
        this.updateLoading = this.updateLoading.bind(this);
    }

    componentDidMount() {
        const {page, limit} = this.state;
        this.getLaptopsPageLimit(page, limit);
    }

    updateLoading(state) {
        this.setState({isLoading: state});
    }

    async getLaptopsPageLimit(page, limit){
        await getLaptops(page, limit)
            .then(data => this.setState({
                laptops: data.laptops,
                laptopsCount: data.laptopsCount
            }))
            .catch(function() {
                showTextErrorToast("Error");
            });
        this.setState({isLoading: false})
    }

    handleClick(offset) {
        const {limit} = this.state;
        //console.log(offset);
        const page = offset / limit;
        this.setState({ page });
        this.setState({ offset });
        this.getLaptopsPageLimit(page, limit);
    }

    render() {
        const {isLoading} = this.state;
        if (isLoading){
            return (
                <div className="laptopsCircularProgress">
                    <CircularProgress />
                </div>
            )
        }
        const  {laptops, limit, offset, laptopsCount} = this.state;
        return(
            <div>
                <div className="laptopList">
                    {
                        laptops.map(laptop =>
                            <Laptop key={laptop.id} laptop = {laptop} />
                        )
                    }
                </div>
                <div className="laptopPaging">
                    <Pagination
                        limit={limit}
                        offset={offset}
                        total={laptopsCount}
                        onClick={(e, offset) => this.handleClick(offset)}
                    />
                </div>
            </div>
        )
    }

}

export default LaptopList;