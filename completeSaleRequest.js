{
  "CompleteSaleRequest": {
    "-xmlns": "urn:ebay:apis:eBLBaseComponents",
    "FeedbackInfo": {
      "#text": " FeedbackInfoType ",
      "CommentText": " string ",
      "CommentType": " CommentTypeCodeType ",
      "TargetUser": " UserIDType (string) "
    },
    "ItemID": " ItemIDType (string) ",
    "ListingType": " ListingTypeCodeType ",
    "OrderID": " string ",
    "OrderLineItemID": " string ",
    "Paid": " boolean ",
    "Shipment": {
      "#text": " ShipmentType ",
      "Notes": " string ",
      "ShipmentTrackingDetails": {
        "#text": " ShipmentTrackingDetailsType ",
        "ShipmentLineItem": {
          "#text": " ShipmentLineItemType ",
          "LineItem": {
            "#text": " LineItemType ",
            "CountryOfOrigin": " string ",
            "Description": " string ",
            "ItemID": " ItemIDType (string) ",
            "Quantity": " int ",
            "TransactionID": " string "
          }
        },
        "ShipmentTrackingNumber": " string ",
        "ShippingCarrierUsed": " string "
      },
      "ShippedTime": " dateTime "
    },
    "Shipped": " boolean ",
    "TransactionID": " string ",
    "ErrorHandling": " ErrorHandlingCodeType ",
    "ErrorLanguage": " string ",
    "MessageID": " string ",
    "Version": " string ",
    "WarningLevel": " WarningLevelCodeType "
  }
}