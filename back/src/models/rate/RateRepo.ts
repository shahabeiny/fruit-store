import { FilterQuery, Schema } from 'mongoose';
import IRate from '../../interfaces/IRate';
import Rate from './RateModel';

class RateRepository {
  async findOne(product: Schema.Types.ObjectId, user: Schema.Types.ObjectId) {
    return await Rate.findOne({ product, user });
  }

  async create(rate: number, user: Schema.Types.ObjectId, product: Schema.Types.ObjectId) {
    return await Rate.create({
      rate,
      user,
      product
    });
  }

  calculateRate(rates: IRate[]): number {
    let ratesMidd = 0;

    if (rates.length > 0) {
      const sum = rates.reduce((acc, rate) => acc + rate.rate, 0);
      ratesMidd = Math.round((sum / rates.length) * 10) / 10;
    }

    return ratesMidd;
  }
}

export default RateRepository;
