package com.hkm.driverview.ListOrderes;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.daimajia.swipe.SwipeLayout;
import com.hkm.driverview.DriverView;
import com.hkm.driverview.R;
import com.nineoldandroids.view.ViewHelper;


import java.text.ParseException;
import java.util.List;


public class OrderAdapter extends FixedRecyclerView.Adapter<OrderAdapter.ViewHolder> {

    private List<OrderCustomer> mListMsg;
    private int[] mUsernameColors;
    private Context __ctx;

    public OrderAdapter(Context context, List<OrderCustomer> messages) {
        //settings for the features
        mListMsg = messages;
        mUsernameColors = context.getResources().getIntArray(R.array.username_colors);
        __ctx = context;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        int layout = -1;
        /*  switch (viewType) {
            case OrderCustomer.TYPE_MESSAGE:
                layout = R.layout.item_message;
                break;
            case OrderCustomer.TYPE_LOG:
                layout = R.layout.item_log;
                break;
            case OrderCustomer.TYPE_ACTION:
                layout = R.layout.item_action;
                break;
        }
        */
        layout = R.layout.item_order;
        View v = LayoutInflater
                .from(parent.getContext())
                .inflate(layout, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {
        OrderCustomer order = mListMsg.get(position);
        viewHolder.setDestin(order.getDestination());
        viewHolder.setFrom(order.getPickUp());
        viewHolder.setCall(order.getCallnumber(), order.getOrderId());
        viewHolder.setRemark(order.getRemark());
        viewHolder.setOrder(order);
        try {
            viewHolder.setTime(order.getMoment());
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @Override
    public int getItemCount() {
        return mListMsg.size();
    }

    @Override
    public int getItemViewType(int position) {
        return mListMsg.get(position).getType();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        private TextView viewFrom;
        private TextView viewTo;
        private TextView remark;
        private TextView __time;
        private ImageView callcustomer;
        private View parentView;
        private SwipeLayout swip;
        private OrderCustomer morder;

        public ViewHolder(View itemView) {
            super(itemView);
            viewFrom = (TextView) itemView.findViewById(R.id.order_from);
            viewTo = (TextView) itemView.findViewById(R.id.order_to);
            remark = (TextView) itemView.findViewById(R.id.remarks);
            __time = (TextView) itemView.findViewById(R.id.time);
            callcustomer = (ImageView) itemView.findViewById(R.id.hammer);
            swip = (SwipeLayout) itemView.findViewById(R.id.swipe_remarks);
            parentView = itemView;
        }

        public void setOrder(OrderCustomer order) {
            morder = order;
        }

        public void setTime(String time) {
            if (null == __time) return;
            __time.setText(time);
        }

        public void setFrom(String from_place) {
            if (null == viewFrom) return;
            viewFrom.setText(from_place);
            viewFrom.setTextColor(getUsernameColor(from_place));
        }

        public void setRemark(String message) {
            if (null == remark) return;
            remark.setText(message);
        }

        public void setDestin(String destination) {
            if (null == viewTo) return;
            viewTo.setText(destination);
            viewTo.setTextColor(getUsernameColor(destination));
        }

        public void setCall(final String num, final String order_id) {
            callcustomer.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    ((DriverView) __ctx).inquiryOrder(num, order_id, morder);
                    //triggerInquiry(num, order_id);
                }
            });
        }


        private int getUsernameColor(String username) {
            int hash = 7;
            for (int i = 0, len = username.length(); i < len; i++) {
                hash = username.codePointAt(i) + (hash << 5) - hash;
            }
            int index = Math.abs(hash % mUsernameColors.length);
            return mUsernameColors[index];
        }


    }
}