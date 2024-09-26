const Products = require('../models/productmodels.js')
// const { options } = require('../router/productsrouter.js')

const getAllProdcuts = async (req, res) => {
    const products = await Products.find({price:{$gt:20}}).select('price')
    res.status(200).json({products, Total: products.length})
}

const getAllProductsStatic = async(req, res) =>{
    const {featured, company, sort, fields, numericFilters} = req.query
    const queryObjective = {}

    if(featured){
        queryObjective.featured = featured===true ? true : false
    }

    if(company){
        queryObjective.company = {$regex:company, $options:'i'}
    }

    if(numericFilters){
        let operatorMaps = {
            '>':'$gt',
            '>=':'$gte',
            '<':'$lt',
            '<=':'$lte',
            '=':'eq'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filter = numericFilters.replace(regEx, (match) => `-${operatorMaps[match]}-`)
        const options = ['price', 'rating']
        filter = filter.split(',').forEach(item => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObjective[field] = {[operator]: Number(value)}
            }
        });
        console.log(queryObjective)
    }
    let result = Products.find(queryObjective)

    //sort()
    if(sort){
        let sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result.sort('createdAt')
    }
    //fields
    if(fields){
        let fieldList = fields.split(',').join(' ') 
        result = result.select(fieldList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products, Total: products.length})
}

module.exports = {getAllProdcuts, getAllProductsStatic}