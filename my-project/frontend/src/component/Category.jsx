
import Wrapper from './Wrapper'
import { useNewsContext } from '../context/NewsContext';

const Category = ({ className }) => {

    const { setNews, fetchNews } = useNewsContext();

    const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

    const handleClick = async (e) => {
        const category = e.target.value;
        const data = await fetchNews(`?q=${category}`);
        setNews(data.articles);
    }

    return (

        <div className={`${className} py-4`}>
            <Wrapper>
                <div className="flex w-full flex-nowrap overflow-x-auto gap-3 px-4 md:px-0 scrollbar-none">
                    {categories.map((category) => {
                        return (
                            <button
                                onClick={handleClick} key={category}
                                value={category}
                                className="btn btn-primary min-w-max"
                            >{category}</button>
                        )
                    })}
                </div>
            </Wrapper>
        </div>
    )
}

export default Category