export module SiteModel{


    export class RemoteResult<T> {
        data: T;
        exception: RemoteException;
        constructor(object: any){
            this.data = object.data;
            this.exception = new RemoteException(object.exception);
        }
    }

    export class RemoteException {
        message : string;
        stackTrace: string;
        constructor(object: any){
            this.message = object.message;
            this.stackTrace = object.stackTrace;
        }
    }

    export class UserProfile {
        userId : number;
        userName : string; 
        mobile : number;
        email: string;
        password : string;
        address : string;
        status: number;
        lastLoggedIn : Date;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
        token : number; 
        role: string;
    }

    export class Menu {
        menuId : number;
        menuName : string; 
        icon : string;
        route : string;
        isSubMenu : number;
        order : number;
        status: number;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
        subMenu : Array<SubMenu> = []; 
    }
    export class SubMenu {
        subMenuId : number;
        subMenuName : string; 
        menuId : number;
        route : string;
        status : number;
        order : number;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
    }

    export class Supplier {
        supplierId : number;
        supplierName : string; 
        companyName : string; 
        mobile : number;
        email: string;
        address : string;
        status: number;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
    }

    export class Customer {
        customerId : number;
        customerName : string;
        mobile : number;
        email: string;
        address : string;
        status: number;
        discountPercentage: number;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
    }

    export class Category {
        categoryId : number;
        categoryName : string;
        description : string;
        status: number;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
    }

    export class SubCategory {
        subCategoryId : number;
        subCategoryName : string;
        categoryId : number;
        description: string;
        status: number;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
        category: Category = new Category();
    }

    export class Product {
        productId : number;
        productCode : string;
        productName : string;
        categoryId : number;
        subCategoryId : number;
        description: string;
        purchasePrice: number;
        sellingPrice: number;
        status: number;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
        category: Category = new Category();
        subCategory: SubCategory = new SubCategory();
    }

    export class Purchase {
        purchaseId : number;
        purchaseNumber : string;
        supplierId : number;
        purchaseDate : Date;
        description: string;
        status: number;
        totalAmount: number;
        balanceAmount: number;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
        supplier: Supplier = new Supplier();
        purchaseProducts: Array<PurchaseProducts> = [];
        payment: Array<Payment> = [];
    }

    export class PurchaseProducts {
        purchaseProductId : number;
        purchaseId : number;
        productId : number;
        quantity : number;
        purchasePrice :number;
        totalPrice : number;
        status: number;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
        product: Product = new Product();
        productName: string;
        productCode: string;
    }

    export class Payment {
        paymentId : number;
        purchaseId : number;
        paymentTypeId : number;
        paidAmount : number;
        paymentDate: Date;
        status: number;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
        paymentType: PaymentType = new PaymentType();
    }

    export class PaymentType {
        paymentTypeId : number;
        type : string;
        status: number;
        createdBy : number;
        createdOn : Date;
        modifiedBy : number;
        modifiedOn : Date;
    }
}